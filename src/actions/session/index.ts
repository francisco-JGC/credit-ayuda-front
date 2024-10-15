import { toast } from "sonner";
import { fetchData } from "@/utils/fetch-data";
import Cookies from "js-cookie"; // Importamos js-cookie

export const login = async (
  username: string,
  password: string
): Promise<unknown> => {
  try {
    const response = await fetchData({
      url: "/auth/login",
      method: "POST",
      data: { username, password },
    });

    toast.dismiss();

    if (!response.success) {
      toast.error("Error al iniciar sesión", {
        description: response.message,
      });
      return false;
    }

    toast.success("Inicio de sesión exitoso!");
    const { data } = response as { data: any };
    Cookies.set("token", data.token);
    Cookies.set("username", data.username);
    Cookies.set("role", data.role);
    return response.data;
  } catch (error) {
    toast.error("Error al iniciar sesión", {
      description: "revisa las credenciales",
    });
    return {};
  }
};

export const logout = (): boolean => {
  try {
    // deleteCookie("token");
    // deleteCookie("username");
    // deleteCookie("username");
    // deleteCookie("role");

    toast.success("Sesión cerrada exitosamente");

    return true;
  } catch (error) {
    toast.error("Error al cerrar sesión");
    return false;
  }
};

export const getSession = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }

  const user = localStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};
