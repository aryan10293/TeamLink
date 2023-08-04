import React from 'react'
import { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
function Login() {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const login = await fetch('http://localhost:2013/login', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (login.ok) {
          const loginData = await login.json();
          localStorage.setItem('loginUser', loginData._id)
          window.location.href = "/dashboard"
          setPassword('');
          setEmail('');
        } else {
          // Handle non-OK response (e.g., authentication error)
          // You can display an error message or handle it differently
          console.error('Login failed:', login.status, login.statusText);
        }
      } catch (error) {
        // Handle fetch errors (e.g., network error)
        // You can display an error message or handle it differently
        console.error('Error during login:', error);
      }
    };
    return (
    
        <div className="auth-modal">
            <div className="close-icon" >ⓧ</div>

            <h2>Login</h2>
            <form  onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={handleChangeEmail}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={handleChangePassword}
                />
                <input className="secondary-button" type="submit" />
            </form>

            <hr/>
            <h2 >
            Don't have an account?{''}
            <Link to="/register" >
              Sign Up
            </Link>
          </h2>

        </div>
    )
}


export default Login
