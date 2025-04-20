import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const apiUri = import.meta.env.VITE_REACT_API_URI;

const LoginSignupDialog = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${apiUri}/auth/login`, loginData, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setLoginData({ email: "", password: "" });
      if (res.data.isAdmin) {
        navigate("/admin/ListUsers");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${apiUri}/auth/register`, signupData, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setSignupData({ name: "", email: "", password: "" });
      toast.success("Successfully signed up!");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
    }
  };

  return (
    <DialogContent className="max-w-md p-6 rounded-2xl shadow-xl">
      <br />
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {error && (
          <p className="text-sm text-red-600 mb-2 text-center">
            {error?.message}
          </p>
        )}

        {/* LOGIN */}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <Card className="border-none shadow-none">
              <CardHeader className="space-y-1 text-center">
                <CardDescription>Login to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="user@fitheniti.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading}
                >
                  Log in
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* SIGN UP */}
        <TabsContent value="signup">
          <form onSubmit={handleSignup}>
            <Card className="border-none shadow-none">
              <CardHeader className="space-y-1 text-center">
                <CardDescription>Join us today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Name Lastname"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newemail">Email</Label>
                  <Input
                    id="newemail"
                    type="email"
                    autoComplete="email"
                    placeholder="user@fitheniti.com"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="newpassword">Password</Label>
                  <Input
                    id="newpassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading}
                >
                  Sign up
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default LoginSignupDialog;
