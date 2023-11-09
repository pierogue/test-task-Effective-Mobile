const requestUrl = 'http://localhost:8001'

export async function createLog(id: number, description:string){
    await fetch(requestUrl,{
        method:'POST',
        body: JSON.stringify({
            user_id:id,
            description:description
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
}