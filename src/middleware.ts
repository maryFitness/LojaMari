import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isTenantRoute = createRouteMatcher([
  '/home'
])

const isTenantAdminRoute = createRouteMatcher([
  '/admin(.*)'
]);


export default clerkMiddleware((auth, req) => {
 
  if (isTenantAdminRoute(req)) {
    auth().protect(has => {
      return (
        has({ permission: 'org:dashboard:admin' })
      )
    })
  }
  if (isTenantRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};