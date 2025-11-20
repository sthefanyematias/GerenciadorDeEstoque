import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../core/types/types';
import { FuncionariosService } from '../../core/services/funcionarios.service';
import { of, switchMap, combineLatest, Observable } from 'rxjs'; 
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service'; 

@Component({
    selector: 'app-funcionarios-editar',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './funcionarios-editar.html',
    styleUrl: './funcionarios-editar.css',
})
export class FuncionariosEditar implements OnInit {

    funcionario: Funcionario | null = null;
    mensagemSucesso: string = '';
    erroMensagem: string = '';
    isEditingOwnProfile: boolean = false;
    isUserAdmin: boolean = false; 
    formSenha!: FormGroup; 

    opcoesRole = [
        { value: 'admin', label: 'Administrador (Total)' },
        { value: 'operador', label: 'Operador (Edição/Criação)' },
        { value: 'consulta', label: 'Consulta (Visualização)' }
    ];

    constructor(
        private service: FuncionariosService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthService,
        private fb: FormBuilder,
        private notificationService: NotificationService 
    ) { }
    
    passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
        const novaSenha = form.get('novaSenha')?.value;
        const confirmarNovaSenha = form.get('confirmarNovaSenha')?.value;
        
        if (novaSenha && confirmarNovaSenha && novaSenha !== confirmarNovaSenha) {
            return { 'mismatch': true };
        }
        return null;
    }

    ngOnInit(): void {
        this.isUserAdmin = this.authService.isAdmin();

        this.formSenha = this.fb.group({
            novaSenha: ['', [Validators.required, Validators.minLength(6)]],
            confirmarNovaSenha: ['', Validators.required]
        }, {
            validator: this.passwordMatchValidator
        });

        combineLatest([
            this.route.paramMap,
            this.authService.getFuncionarioId$()
        ]).pipe(
            switchMap(([params, idFuncionarioLogado]): Observable<Funcionario | undefined> => { 
                const idString = params.get('id');

                if (idString && idFuncionarioLogado) {
                    this.isEditingOwnProfile = (idString === String(idFuncionarioLogado));
                    
                    if (!this.isEditingOwnProfile && !this.isUserAdmin) {
                        this.notificationService.mostrarAviso(
                            'Acesso Restrito',
                            'Você só pode editar seu próprio perfil de usuário.'
                        );
                        this.router.navigate(['/']);
                        return of(undefined); 
                    }

                    const idParametro = parseInt(idString, 10);
                    return this.service.buscarPorId(idParametro);
                }

                this.isEditingOwnProfile = false;
                return of(undefined);
            })
        ).subscribe({
            next: (f) => {
                if (f) {
                    if (f.data_admissao) {
                        f.data_admissao = new Date(f.data_admissao).toISOString().substring(0, 10);
                    }
                    f.senha = ''; 
                    this.funcionario = f;
                } else {
                    this.notificationService.mostrarAviso('Erro de Carga', 'Funcionário não encontrado ou ID inválido.');
                    this.router.navigate(['/funcionarios']); 
                    this.funcionario = null;
                }
            },
            error: (err) => {
                this.erroMensagem = 'Falha ao buscar dados do funcionário.';
                console.error('Erro de busca:', err);
            }
        });
    }

    editarFuncionario(): void {
        this.mensagemSucesso = '';
        this.erroMensagem = '';

        if (!this.funcionario || !this.funcionario.id) {
            this.erroMensagem = 'Erro: Dados do funcionário não carregados ou ID ausente.';
            return;
        }

        if (this.isEditingOwnProfile) {
            
            this.formSenha.markAllAsTouched(); 
            
            if (this.formSenha.invalid) {
                this.erroMensagem = 'Por favor, corrija os erros de validação da senha.'; 
                return; 
            }
            
            const novaSenha = this.formSenha.get('novaSenha')?.value;

            this.service.alterarSenha(this.funcionario.id, novaSenha).subscribe({
                next: () => {
                    this.authService.funcionarioLogado!.onboarded = true;
                    localStorage.setItem('authData', JSON.stringify(this.authService.funcionarioLogado));
                    
                    this.notificationService.mostrarAviso(
                        'Sucesso na Alteração!',
                        'Sua senha foi alterada com sucesso. Você será desconectado para realizar um novo login com a nova senha.'
                    );
                    this.formSenha.reset();
                    setTimeout(() => {
                        this.authService.logout();
                        this.router.navigate(['/login']);
                    }, 4000);
                },
                error: (err) => {
                    this.erroMensagem = err.message || 'Falha ao alterar a senha. Tente novamente.';
                }
            });
            return;
        }

        if (!this.isEditingOwnProfile && this.isUserAdmin) {
            this.service.editar(this.funcionario).subscribe({
                next: (f) => {
                    this.notificationService.mostrarAviso(
                        'Sucesso na Edição',
                        `Funcionário '${f.nome}' (ID: ${f.id}) atualizado com sucesso!`
                    );
                    setTimeout(() => this.router.navigate(['/funcionarios']), 3000);
                },
                error: (err) => {
                    this.erroMensagem = 'Falha ao atualizar funcionário. Verifique a API.';
                }
            });
            return;
        }
        
        if (!this.isUserAdmin) {
            this.notificationService.mostrarAviso(
                'Ação Negada',
                'Você não tem permissão para editar outros perfis. Tente novamente.'
            );
        }
    }

    cancelar(): void {
        this.router.navigate([this.isEditingOwnProfile ? '/' : '/funcionarios']);
    }
}