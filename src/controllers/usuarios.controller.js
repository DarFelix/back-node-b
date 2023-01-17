import { getConnection, sql, queries } from "../database";

export const getUsuarios = async (req, res) => {
    
    try{

        const pool = await getConnection();
        const result = await pool.request().execute(queries.getAllUsers)
        res.json(result.recordset);

    } catch (error){

        res.status(500);
        res.send(error.message);

    }

   
}

export const createUsuario = async (req, res) => {
    
    const {nombres, numero_doc, age, estado_usuario } = req.body;
    let { height, telefono } = req.body;
    let { pass } = req.body;

    if(nombres == null || numero_doc == null || age == null || estado_usuario == null){
        return res.status(400).json({msg: 'Bad request. Please fill all the necesary fields'})
    }

    if(height == null || telefono == null) {
        height = 0;
        telefono = 'none'
    }

    if(pass == null) pass = '123456';

    const obj = {nombres, numero_doc, age, estado_usuario, height, telefono, pass }



    try {

        const pool = await getConnection();

        await pool.request()
            .input("nombres", sql.VarChar, obj.nombres)
            .input("docu", sql.VarChar, obj.numero_doc)
            .input("age", sql.Int, obj.age)
            .input("estado", sql.VarChar, obj.estado_usuario)
            .input("height", sql.Decimal, obj.height)
            .input("telefono", sql.VarChar, obj.telefono)
            .input("pass", sql.VarChar, obj.pass)
            .execute(queries.createUser)
        
        return res.status(201).json({msg: 'Usuario creado'})
        
    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
}


export const getUserByDoc = async (req, res) => {

    const {id} = req.params

    const pool = await getConnection();

    const result = await pool.request()
                    .input("docu", sql.VarChar, id)
                    .execute(queries.getUser)

    console.log(result);

    res.json(result.recordset);
}

export const deleteUser = async (req, res) => {

    const {id} = req.params

    const pool = await getConnection();

    const result = await pool.request()
                    .input("id", sql.VarChar, id)
                    .execute(queries.deleteUser)

    res.sendStatus(204);
}


export const actualizarUsuario = async (req, res) => {
    
    const {nombres, numero_doc, age, estado_usuario, height, telefono, pass } = req.body;
    const {id} = req.params;

    if(nombres == null || numero_doc == null || age == null || estado_usuario == null || height == null || telefono == null || pass == null ){
        return res.status(400).json({msg: 'Bad request. Please fill all the necesary fields'})
    }


    try {

        const pool = await getConnection();

        await pool.request()
            .input("id", sql.Int, id)
            .input("nombres", sql.VarChar, nombres)
            .input("docu", sql.VarChar, numero_doc)
            .input("age", sql.Int, age)
            .input("estado", sql.VarChar, estado_usuario)
            .input("height", sql.Decimal, height)
            .input("telefono", sql.VarChar, telefono)
            .input("pass", sql.VarChar, pass)
            .execute(queries.updateUser)
        
        return res.status(204).json({msg: 'Usuario modificado'});
        
    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
}