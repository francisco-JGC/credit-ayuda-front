import { FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/actions/session'
import useForm from '@/hooks/useForm'
import { toast } from 'sonner'
import { useAuth } from '@/components/protectedRoute/authProvider'
import { useNavigate } from 'react-router-dom';


interface ILogin {
  username: string
  password: string
}

export default function LoginPage() {
  const { setUser } = useAuth()
  const { formValues, handleInputChange } = useForm<ILogin>({
    username: '',
    password: ''
  })
  const navigate = useNavigate();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValues.username || !formValues.password)
      return toast.info('Por favor complete los campos')


    toast.loading('Iniciando sesión...')

    const response = await login(formValues.username, formValues.password) as any
    toast.dismiss()

    if (response) {
      setUser({
        role: response.role,
        username: response.username,
        token: response.token
      })

      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center -mt-6 ">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Inicio de sesión</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <Input
              id="username"
              name="username"
              placeholder="usuario"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formValues.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">
            Iniciar sesión
          </Button>
        </form>

      </div >
    </div >
  );
}
