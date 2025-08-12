# Dashboard

**Status**: To be defined

This section contains information about dashboard functionality for the DEFASA_CXP business unit.

## Content Areas

- To be defined
- To be defined
- To be defined

# Massive download for for XML

| Field                 | Type            | Description                                       |
| --------------------- | --------------- | ------------------------------------------------- |
| **RFC**               | Select          | RFC                                               |
| **Clave CIEC**        | Password        | Password                                          |
| **Rango de fecha**    | Date            | Range of dates                                    |
| **Tipo**              | Select          | "Recibido" and "Emitido"                          |
| **Estatus**           | Select          | "Vigente" ,"Cancelado","Todos"                    |
| **Efecto**            | Multiple select | "Ingreso", "Egreso", "Traslado", "Pago", "Nómina" |
| **RFC emisor**        | Text            |                                                   |
| **Complemento**       | Select          |                                                   |
| **Generar el PDF**    | Checkbox        | If checked, the PDF will be generated.            |
| **Descargar los XML** | Checkbox        | If checked, the XML will be downloaded.           |

# Facturas para Provision

| Field                | Type     | Description                                     |
| -------------------- | -------- | ----------------------------------------------- |
| **Base**             | Select   | Accounts                                        |
| **RFC**              | Select   | RFC                                             |
| **Proveedor**        | Text     | Provider                                        |
| **UUID**             | Text     | 128-bit number                                  |
| **Tipo**             | Select   | "Recibido" and "Emitido"                        |
| **Folio**            | Number   | Invoice number                                  |
| **Fecha**            | Date     | Date                                            |
| **Metodo de pago**   | Text     |                                                 |
| **Forma Pago**       | Text     |                                                 |
| **Moneda**           | Select   | "USA" or MXN"                                   |
| **Concepto**         | Text     | Description of the concept                      |
| **Subtotal**         | Number   | Subtotal amount                                 |
| **IVA**              | Number   | VAT amount                                      |
| **Total**            | Number   | Total amount                                    |
| **Socio de Negocio** | Text     | Business partner                                |
| **General**          | Checkbox | If checked, the invoice will be generated.      |
| **Pedido**           | Checkbox | If checked, the invoice will be generated.      |
| **No. Pedido**       | Text     | Order number                                    |
| **Nombre Cuenta**    | Select   | Account name                                    |
| **Cuenta**           | Text     | Account number                                  |
| **Inmueble**         | Select   | Property                                        |
| **Pagado**           | Checkbox | If checked, the invoice will be marked as paid. |
| **Corregir Importe** | Text     | If checked, the amount will be corrected.       |

# Tables

## Facturas Exel

### Facturas Pendientes Provision

| Field              | Example                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| **BD**             | CORPORATIVO ATZLA                                                         |
| **UUID**           | 123e4567-e89b-12d3-a456-426614174000                                      |
| **RFC**            | XAXX010101000                                                             |
| **PROVIDER**       | TOTAL BOX                                                                 |
| **Tipo**           | "I" or "E"                                                                |
| **Folio**          | "FACT - B1-400900066T1-1" (if I) or "NC - 356664770927187343_0_A1" (if E) |
| **Fecha**          | 2023-10-01                                                                |
| **Subtotal**       | 1000.00                                                                   |
| **IVA**            | 160.00 or null                                                            |
| **Base C/IVA**     | 1000.00 or null                                                           |
| **Base S/IVA**     | 1000.00 or null                                                           |
| **ISR Retenido**   | 0.00 or null                                                              |
| **IVA Retenido**   | 0.00 or null                                                              |
| **Diferencia**     | 0.00 or null                                                              |
| **Total**          | 1160.00                                                                   |
| **Metodo de Pago** | "PPD" or "PUE"                                                            |
| **Forma Pago**     | 1-99                                                                      |
| **Concepto**       |
| **Cajas**          | Checkbox, If checked, the invoice will be sent to the boxes.              |

### Facturas Para Prevision

| Field                     | Example                                                                   |
| ------------------------- | ------------------------------------------------------------------------- |
| **BD**                    | CORPORATIVO ATZLA                                                         |
| **UUID**                  | 123e4567-e89b-12d3-a456-426614174000                                      |
| **RFC**                   | XAXX010101000                                                             |
| **PROVIDER**              | TOTAL BOX                                                                 |
| **Tipo**                  | "I" or "E"                                                                |
| **Folio**                 | "FACT - B1-400900066T1-1" (if I) or "NC - 356664770927187343_0_A1" (if E) |
| **Fecha**                 | 2023-10-01                                                                |
| **Subtotal**              | 1000.00                                                                   |
| **IVA**                   | 160.00 or null                                                            |
| **Base C/IVA**            | 1000.00 or null                                                           |
| **Base S/IVA**            | 1000.00 or null                                                           |
| **ISR Retenido**          | 0.00 or null                                                              |
| **IVA Retenido**          | 0.00 or null                                                              |
| **Diferencia**            | 0.00 or null                                                              |
| **Total**                 | 1160.00                                                                   |
| **Metodo de Pago**        | "PPD" or "PUE"                                                            |
| **Forma Pago**            | 1-99                                                                      |
| **Concepto**              | DESCUENTO PRONTO PAGO                                                     |
| **Path**                  | C:\...                                                                    |
| **Moneda**                | "MXN" or "USD"                                                            |
| **Provision**             | Checkbox, If checked, the invoice will be provisioned.                    |
| **Lineas**                | "1" and "2"                                                               |
| **Proveedor Sin**         | "P000307"                                                                 |
| **Doc Num**               | "7952"                                                                    |
| **Atc Entry**             | "4742"                                                                    |
| **IVA 16**                | W2 or 16C                                                                 |
| **IVA 0**                 | W1 or OC or EXC                                                           |
| **Moneda SAP**            | "MXN" or "USD"                                                            |
| **Pedido/Factura**        | Number                                                                    |
| **Cuenta**                | Number                                                                    |
| **Nombre Cuenta**         | Text                                                                      |
| **Inmueble**              | Text                                                                      |
| **Retencion**             | Checkbox, If checked, the invoice will be retained.                       |
| **Monto Gasto Propuesto** | Number                                                                    |
| **Relevante Presupuesto** | Checkbox, If checked, the invoice will be relevant for the budget.        |
| **Fuera de presupuesto**  | Checkbox, If checked, the invoice will be outside the budget.             |
| **WTLiable**              | N, Y null                                                                 |
| **ITWTCode**              | number                                                                    |
| **C/IVA**                 | Number                                                                    |
| **Ajuste**                | Number                                                                    |
| **Validator**             | Only "True"                                                               |
| **Pagada**                | Checkbox, If checked, the invoice will be marked as paid.                 |
| **DocEntry**              | Number                                                                    |
| **Columna1**              | Number                                                                    |
| **Columna2**              | Checkbox, If checked, the invoice will be sent to the boxes.              |
| **Caja Chica**            | Text                                                                      |

### Facturas Para Pago

| Field            | Example                      |
| ---------------- | ---------------------------- |
| **BD**           | CORPORATIVO ATZLA            |
| **Proveedor SN** | TOTAL BOX                    |
| **Total**        | 1160.00                      |
| **Caja Chica**   | Text                         |
| **DocEntry**     | Number                       |
| **Doc Num**      | "7952"                       |
| **Doc Num**      | "4742"                       |
| **ID Unico**     | "D Y H ADMINISTRACIONES8017" |
| **0**            | "3054,5"                     |
| **BD**           | CORPORATIVO ATZLA            |
| **Proveedor SN** | "P001029"                    |
| **Doc Summary**  | "7952"                       |
| **Caja Chica**   | Text                         |

## Facturas Pendientes Pago excel

### Pendientes Pago

| Field            | Example                                            |
| ---------------- | -------------------------------------------------- |
| **BD**           | CORPORATIVO ATZLA                                  |
| **CardCode**     | "P0058"                                            |
| **CardName**     | "TOTAL BOX"                                        |
| **DocEntry**     | "4742"                                             |
| **DocDate**      | "2023-10-01"                                       |
| **Atc Entry**    | "4742"                                             |
| **JrnlMemo**     | "Fact.proveedores-P0058"                           |
| **NumAtCard**    | "FACT 2229"                                        |
| **U_UDF_UUID**   | "123e4567-e89b-12d3-a456-426614174000"             |
| **Monto**        | "1234"                                             |
| **DocTotal**     | "1234"                                             |
| **Aplicar Pago** | Checkbox, If checked, the payment will be applied. |
| **Doc NUm**      | "7952"                                             |
| **Comentarios**  | "Pago de factura pendiente"                        |
| **Anexo**        | "Factura 1234"                                     |
| **Fecha Pago**   | "2023-10-01"                                       |
| **Ruta**         | "C:\...\"                                          |

### Para Pago (duplicated?)

| Field               | Example                                            |
| ------------------- | -------------------------------------------------- |
| **BD**              | CORPORATIVO ATZLA                                  |
| **CardCode**        | "P0058"                                            |
| **CardName**        | "TOTAL BOX"                                        |
| **DocNum**          | "4742"                                             |
| **DocDate**         | "2023-10-01"                                       |
| **Atc Entry**       | "4742"                                             |
| **JrnlMemo**        | "Fact.proveedores-P0058"                           |
| **NumAtCard**       | "FACT 2229"                                        |
| **U_UDF_UUID**      | "123e4567-e89b-12d3-a456-426614174000"             |
| **Monto**           | "1234"                                             |
| **DocTotal**        | "1234"                                             |
| **Aplicar Pago**    | Checkbox, If checked, the payment will be applied. |
| **Doc NUm**         | "7952"                                             |
| **Comentarios**     | "Pago de factura pendiente"                        |
| **Anexo**           | "Factura 1234"                                     |
| **Fecha Pago**      | "2023-10-01"                                       |
| **Ruta**            | "C:\...\"                                          |
| **Importe**         | "1234"                                             |
| **Conceptos**       | "Pago de factura pendiente"                        |
| **Cuenta Bancaria** | "0000000112773775"                                 |
| **Nombre Cuenta**   | "Cuenta de proveedores"                            |
| **Cuenta Pago**     | "112773775"                                        |
| **Moneda**          | "MXN" or "USD"                                     |
| **Tipo Cambio**     | "20.00"                                            |

## CPDYH v2 excel

### General Table

| Empresa/Persona                                                                | RFC          | Columna1 | Alias      | Pendientes                                                                                                        |
| ------------------------------------------------------------------------------ | ------------ | -------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| BANCA MIFEL SOCIEDAD ANONIMA NUM TRESCIENTOS NOVENTA Y CINCO DIAG DOS MIL TRES | BMA0308271K3 | Checked  | Fid.\_0395 | Checked si encuentra la razon social y busca que todas las facturas esten provisionadas en todas las otras tablas |

For each row in the table is a table , each Empresa has its own table with the following fields:
"Facturas emitidas por sat"
Todo esto se obtiene del xml

| Field                   | Example                                         |
| ----------------------- | ----------------------------------------------- |
| **Unidad Negocio**      | "DEFASA_CXP"                                    |
| **UUID**                | "123e4567-e89b-12d3-a456                        |
| **RFC**                 | "BMA0308271K3"                                  |
| **Proveedor**           | "BANCA MIFEL SOCIEDAD ANONIMA NUM T             |
| **Tipo**                | "Recibido" or "Emitido"                         |
| **Folio**               | "FACT - B1-400900066T1-1                        |
| **Fecha**               | "2023-10-01"                                    |
| **Subtotal**            | 1000.00                                         |
| **IVA**                 | 160.00 or null                                  |
| **Total**               | 1160.00                                         |
| **Metodo Pago**         | "PPD" or "PUE"                                  |
| **Forma Pago**          | 1-99                                            |
| **Clave**               | Sap Id of the "factura"                         |
| **Concepto**            | "DESCUENTO PRONTO PAGO"                         |
| **Ruta**                | "C:\..."                                        |
| **Moneda**              | "MXN" or "USD"                                  |
| **BD**                  | "CORPORATIVO ATZLA"                             |
| **Estatus**             | "No procede CFDI" or "No Sap" or "Provisionado" |
| **Estatus 2**           | "OK" or "No Provisionado"                       |
| **Pagado a la fecha**   | "5646"                                          |
| **Pendiente de Pago**   | "173,260"                                       |
| **Dif vs Complementos** | "10,531.78"                                     |
| **Estatus Complemento** | "Ok" or "Falta Complemento"                     |

## Flow

Starts in CPDYH that checks that all the bussines units are provisionados o no provisionado
