import  api, { authenticatedAPI }  from "./services";

export async function login(email: string, password: string){
  try{
    const response = await api.post("/auth/login", {
      email, password
    });
    return response.data.accessToken;
  } catch (err) {
    throw err;
  } 
}

export async function verifyToken(){
    try{
      await authenticatedAPI.post("/auth/verifytoken");
    } catch (err) {
      throw err;
    } 
  }