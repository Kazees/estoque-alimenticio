import type { AuthPayload } from '@/scripts/models/auth'
import { RolesEnum } from '@/scripts/utils/Enums'
import { jwtDecode } from 'jwt-decode'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // usa a History API do browser para navegação sem recarregar a página
  routes: [
    // Rota aberta
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true }, // redireciona para /login se não estiver logado
      children: [
        // Rota protegida - Apenas admin
        {
          path: '/admin/funcionarios',
          name: 'admin-funcionarios',
          component: () => import('@/views/admin/AdminFuncionariosView.vue'),
          meta: { 
            requiresAuth: true, // Precisa estar logado para acessar
            requiredRole: RolesEnum.ADMIN // Precisa ser admin para acessar
          } 
        },
        {
          path: '/admin/produtos',
          name: 'admin-produtos',
          component: () => import('@/views/admin/AdminProdutosView.vue'),
          meta: {
            requiresAuth: true, // Precisa estar logado para acessar
            requiredRole: RolesEnum.ADMIN // Precisa ser admin para acessar
          }
        },
        // Rota protegida - Qualquer user ou admin (Funcionário)
        {
          path: '/produto',
          name: 'produto',
          component: () => import('@/views/produto/ProdutoView.vue'),
          meta: { requiresAuth: true } // Precisa estar logado para acessar
        },
        {
          path: '/lote',
          name: 'lote',
          component: () => import('@/views/lote/LoteView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/fornecedor',
          name: 'fornecedor',
          component: () => import('@/views/fornecedor/FornecedorView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/transacao',
          name: 'transacao',
          component: () => import('@/views/transacao/TransacaoView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/perfil',
          name: 'perfil',
          component: () => import('@/views/funcionario/PerfilView.vue'),
          meta: { requiresAuth: true }
        },
      ]
    },
    // Rota login
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
      meta: { guestOnly: true } // redireciona para /produto se já estiver logado
    },

    // Rota 404 - Página não encontrada
    // :pathMatch é um recurso do Vue Router para capturar todas as rotas que não correspondem a nenhuma das anteriores
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/erros/NotFoundView.vue')
    }
  ],

  // controla o scroll ao navegar
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition // volta para a posição anterior se houver
    return { top: 0 } // rola para o topo da página
  }
})

// to → objeto da rota de destino (para onde está indo)
// from → objeto da rota de origem (de onde vem)
// next → funcionalidade para navegar para a próxima rota
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // obtém o token do usuário
  const isAuthenticated = !!token // verifica se o token existe

  // Se a rota tem meta.guestOnly E o usuário JÁ está logado, redireciona para /produto
  if (to.meta.guestOnly && isAuthenticated) {
    next('/produto')
    return
  }

  // Se a rota requer autenticação E o usuário NÃO está logado, redireciona para /login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // Se a rota requer uma role específica E o usuário não tem, redireciona para /produto
  if (to.meta.requiredRole && token) {
    const payload = jwtDecode<AuthPayload>(token)
    if (payload.role !== to.meta.requiredRole) {
      next('/not-found') 
      return
    }
  }

  // Se tudo estiver ok, continua para a rota
  next()
})

export default router
