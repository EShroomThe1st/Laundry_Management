import { Suspense, lazy } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import TestPage from '../pages/TestPage'
import { ROLE } from '../utils/role'

const StafLayout = lazy(() => import('../components/layout/staff-layout'))
const AdLayout = lazy(() => import('../components/layout/admin-layout'))
const PubLayout = lazy(() => import('../components/layout/public-layout'))

//public
const LoginPage = lazy(() => import('../pages/LoginPage'))

//admin
const AdminUsersList = lazy(() => import('../pages/AdminUsersList'))

//staff
const StaffLaundryPackList = lazy(() => import('../pages/StaffLaundryPackList'))
const StaffServicetTypeList = lazy(() => import('../pages/StaffServiceTypeList'))
const StaffOrderList = lazy(() => import('../pages/StaffOrdersList'))

const PrivateRoute = lazy(() => import('./proute'))



const AdminLayout = () => {
  return (
    <AdLayout>
      <Outlet />
    </AdLayout>
  )
}

const PublicLayout = () => {
  return (
    <PubLayout>
      <Outlet />
    </PubLayout>
  )
}

const StaffLayout = () => {
  return (
    <StafLayout>
      <Outlet />
    </StafLayout>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN, ROLE.STAFF]}>
          <PublicLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <PrivateRoute inverted={true}><></></PrivateRoute>,
      },
      {
        path: 'test',
        element: (
          <Suspense fallback={<></>}>
            <TestPage />
          </Suspense>
        )
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
              <AdminLayout />
            </PrivateRoute>
          </Suspense>
        ),
        children: [
          {
            path: 'users',
            element: (
              <Suspense fallback={<></>}>
                <AdminUsersList />
              </Suspense>
            )
          }
        ]
      },
      {
        path: '/staff',
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.STAFF]}>
              <StaffLayout />
            </PrivateRoute>
          </Suspense>
        ),
        children: [
          {
            path: 'laundry',
            element: (
              <Suspense fallback={<></>}>
                <StaffLaundryPackList />
              </Suspense>
            )
          },
          {
            path: 'service',
            element: (
              <Suspense fallback={<></>}>
                <StaffServicetTypeList />
              </Suspense>
            )
          },
          {
            path: 'order',
            element: (
              <Suspense fallback={<></>}>
                <StaffOrderList/>
              </Suspense>
            )
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    element: (
      <PrivateRoute inverted={true}>
        <Suspense fallback={<></>}>
          <LoginPage />
        </Suspense>
      </PrivateRoute>
    )
  },
])
