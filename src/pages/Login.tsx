import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';

export default function Login() {
  return (
    <>
      <div className="container">
        <div className="py-20">
          <div className="mx-auto border rounded-md shadow-lg p-8 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below
              </p>
            </div>
            <div className="flex justify-around mt-5">
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="border-b-2 border-blue-600">
                  User 1
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-52"
                >
                  <p>
                    <span className="font-bold">Email:</span> a@gmail.com
                  </p>
                  <p className="mt-2">
                    <span className="font-bold">Password:</span> 123456
                  </p>
                </ul>
              </div>
              <div className="dropdown dropdown-hover dropdown-end">
                <label tabIndex={0} className="border-b-2 border-blue-600">
                  User 2
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-52"
                >
                  <p>
                    <span className="font-bold">Email:</span> b@gmail.com
                  </p>
                  <p className="mt-2">
                    <span className="font-bold">Password:</span> 123456
                  </p>
                </ul>
              </div>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have account?
              <br />
              <Link
                to="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
