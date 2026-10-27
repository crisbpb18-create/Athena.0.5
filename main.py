import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client, Client
 
load_dotenv()
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
supabase: Client = create_client(
    supabase_url=os.getenv("SUPABASE_URL"),
    supabase_key=os.getenv("SUPABASE_KEY")
)
 
class Usuario(BaseModel):
    nome: str
 
@app.get("/usuarios")
def listar_usuarios():
    response = supabase.table("usuarios").select("*").order(
        "id", desc=False).execute()
    return response.data
 
@app.post("/usuarios")
def cadastrar_usuario(usuario: Usuario):
    reposta = supabase.table("usuarios").insert({
        "nome": usuario.nome}).execute()
    return reposta.data[0]
 
@app.put("/usuarios/{id}")
def atualizar_usuario(id: int, usuario: Usuario):
    response = supabase.table("usuarios").update({
        "nome": usuario.nome}).eq("id", id).execute()
 
    if len(response.data) == 0:
        raise HTTPException(status_code=404,
                            detail="Usuário não encontrado")
    return response.data[0]
 
@app.delete("/usuarios/{id}")
def excluir_usuario(id: int):
    response = supabase.table(
        "usuarios").delete().eq("id", id).execute()
 
    if len(response.data) == 0:
        raise HTTPException(status_code=404,
                            detail="Usuário não encontrado")
    return {"message": "Usuário excluído com sucesso"}
 