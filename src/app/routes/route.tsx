import { Suspense, lazy } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import TestPage from '../pages/TestPage'

const StafLayout = lazy(() => import('../components/layout/staff-layout'))
const AdLayout = lazy(() => import('../components/layout/admin-layout'))

//public
const LoginPage = lazy(() => import('../pages/LoginPage'))

//admin
const AdminUsersList = lazy(() => import('../pages/AdminUsersList'))

//staff
const StaffLaundryPackList = lazy(() => import('../pages/StaffLaundryPackList'))
const StaffServicetTypeList = lazy(() => import('../pages/StaffServiceTypeList'))

const PrivateRoute = lazy(() => import('./proute'))



const AdminLayout = () => {
  return (
    <AdLayout>
      <Outlet />
    </AdLayout>
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
      <PrivateRoute inverted={true}>
      <Suspense fallback={<></>}>
        <LoginPage />
      </Suspense>
    </PrivateRoute>
    ),
    children: [
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
      {
        path: 'test',
        element: (
          <Suspense fallback={<></>}>
            <TestPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={false}>
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
        <PrivateRoute inverted={false}>
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
        path: 'service-type',
        element: (
          <Suspense fallback={<></>}>
            <StaffServicetTypeList />
          </Suspense>
        )
      }
    ]
  }
])
