import { z } from 'zod';

/*
CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED PRIMARY KEY,
    nombre VARCHAR(255),
    id_responsable BIGINT(20) UNSIGNED ,
    estado TINYINT(4) ,
    created_by BIGINT(20) UNSIGNED ,
    update_by BIGINT(20) UNSIGNED ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_responsable) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (update_by) REFERENCES users(id)
);
*/
const bodegasSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().min(3).max(255),
    id_responsable: z.number().int().positive(),
    estado: z.number().int().positive(),
    created_by: z.number().int().positive(),
    update_by: z.number().int().positive(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    deleted_at: z.coerce.date()
});

/*
CREATE TABLE productos(
    id BIGINT(20) UNSIGNED PRIMARY KEY,
    nombre VARCHAR(255) ,
    descripcion VARCHAR(255) ,
    estado TINYINT(4) ,
    created_by BIGINT(20) UNSIGNED ,
    update_by BIGINT(20) UNSIGNED ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (update_by) REFERENCES users(id)
);
*/
const productoSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().min(3).max(255),
    descripcion: z.string().min(3).max(255),
    estado: z.number().int().positive(),
    created_by: z.number().int().positive(),
    update_by: z.number().int().positive(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().optional()
});

/*
CREATE TABLE inventarios(
    id BIGINT(20) UNSIGNED PRIMARY KEY,
    id_bodega BIGINT(20) UNSIGNED,
    id_producto BIGINT(20) UNSIGNED,
    cantidad INT(11) ,
    created_by BIGINT(20) UNSIGNED ,
    update_by BIGINT(20) UNSIGNED ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_bodega) REFERENCES bodegas(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (update_by) REFERENCES users(id)
);
*/
const inventarioSchema = z.object({
    id_bodega: z.number().int().positive(),
    id_producto: z.number().int().positive(),
    cantidad: z.number().int().positive(),
})

/* CREATE TABLE historiales(
    id BIGINT(20) UNSIGNED PRIMARY KEY,
    cantidad INT(11),
    id_bodega_origen BIGINT(20) UNSIGNED ,
    id_bodega_destino BIGINT(20) UNSIGNED ,
    id_inventario BIGINT(20) UNSIGNED ,
    created_by BIGINT(20) UNSIGNED ,
    update_by BIGINT(20) UNSIGNED ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_bodega_origen) REFERENCES bodegas(id),
    FOREIGN KEY (id_bodega_destino) REFERENCES bodegas(id),
    FOREIGN KEY (id_inventario) REFERENCES inventarios(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (update_by) REFERENCES users(id)
); */

const historialSchema = z.object({
    id: z.number().int().positive(),
    cantidad: z.number().int().positive(),
    id_bodega_origen: z.number().int().positive(),
    id_bodega_destino: z.number().int().positive(),
    id_inventario: z.number().int().positive(),
    created_by: z.number().int().positive(),
    update_by: z.number().int().positive(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().optional()
})

const trasladoSchema = z.object({
    id: z.number().int().positive(),
    id_bodega_origen: z.number().int().positive(),
    id_bodega_destino: z.number().int().positive(),
    id_producto: z.number().int().positive(),
    update_by: z.number().int().positive(),
    cantidad: z.number().int().positive(), 
    id_inventario: z.number().int().positive(), 
})

export {
    bodegasSchema,
    productoSchema,
    inventarioSchema,
    historialSchema,
    trasladoSchema
}