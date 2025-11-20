import { MovimentacaoEstoque } from './../../pages/movimentacao-estoque/movimentacao-estoque';
import { RecuperarSenha } from './../../pages/recuperar-senha/recuperar-senha';
import { adminGuard } from './../../core/guards/admin.guard';
import { perfilGuard } from './../../core/guards/perfil.guard';
import { onboardingGuard } from './../../core/guards/onboarding.guard';
import { authGuard } from './../../core/guards/auth.guard';
import { FuncionariosExcluir } from './../../components/funcionarios-excluir/funcionarios-excluir';
import { FuncionariosConsultar } from './../../components/funcionarios-consultar/funcionarios-consultar';
import { FuncionariosEditar } from './../../components/funcionarios-editar/funcionarios-editar';
import { FuncionariosCadastrar } from './../../components/funcionarios-cadastrar/funcionarios-cadastrar';
import { FuncionariosListar } from './../../components/funcionarios-listar/funcionarios-listar';
import { Editar } from './../../components/editar/editar';
import { Excluir } from './../../components/excluir/excluir';
import { Consultar } from './../../components/consultar/consultar';
import { Cadastrar } from './../../components/cadastrar/cadastrar';
import { Listar } from './../../components/listar/listar';
import { Main } from './../../pages/main/main';
import { Onboarding } from './../../pages/onboarding/onboarding';
import { Login } from './../../pages/login/login';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Login' },
  { path: 'recuperar-senha', component: RecuperarSenha, title: 'Recuperar Senha' }, 
  { path: 'onboarding', component: Onboarding, title: 'Primeiro Acesso', canActivate: [onboardingGuard] },
  { path: '', component: Main, title: 'Controle de Estoque', canActivate: [authGuard, onboardingGuard] },
  { path: 'movimentar', component: MovimentacaoEstoque, title: 'Movimentação de Estoque', canActivate: [authGuard, onboardingGuard, perfilGuard]},
  { path: 'listar', component: Listar, title: 'Produtos', canActivate: [authGuard, onboardingGuard] },
  { path: 'consultar', component: Consultar, title: 'Consultar Produto', canActivate: [authGuard, onboardingGuard] },
  { path: 'cadastrar', component: Cadastrar, title: 'Cadastrar Produto', canActivate: [authGuard, onboardingGuard, perfilGuard] },
  { path: 'excluir', component: Excluir, title: 'Excluir Produto', canActivate: [authGuard, onboardingGuard, perfilGuard] },
  { path: 'editar/:id', component: Editar, title: 'Editar Produto', canActivate: [authGuard, onboardingGuard, perfilGuard] },
  { path: 'funcionarios', component: FuncionariosListar, title: 'Gestão de Pessoal', canActivate: [authGuard, onboardingGuard, adminGuard] },
  { path: 'funcionarios/cadastrar', component: FuncionariosCadastrar, title: 'Novo Funcionário', canActivate: [authGuard, onboardingGuard, adminGuard] },
  { path: 'funcionarios/consultar', component: FuncionariosConsultar, title: 'Consultar Funcionário', canActivate: [authGuard, onboardingGuard, adminGuard] },
  { path: 'funcionarios/editar/:id', component: FuncionariosEditar, title: 'Editar Perfil', canActivate: [authGuard, onboardingGuard] },
  { path: 'funcionarios/excluir', component: FuncionariosExcluir, title: 'Excluir Funcionário', canActivate: [authGuard, onboardingGuard, adminGuard]},
  { path: '**', redirectTo: 'login' }
];
