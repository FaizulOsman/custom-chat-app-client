import { SignupForm } from '../components/SignUpForm';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
      <div className="container">
        <div className="py-20">
          <div className="mx-auto border rounded shadow-lg -md p-4 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
              {/* <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p> */}
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have account? <br />
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
