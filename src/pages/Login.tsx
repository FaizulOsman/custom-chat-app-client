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
