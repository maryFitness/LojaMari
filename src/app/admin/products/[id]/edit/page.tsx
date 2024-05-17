import db from "@/db/db";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";

export default async function EditProductPage({ params: { id }} : { params:{ id:string }}) {
    const product = await db.product.findUnique({ where: { xata_id : id}})
  return (
    <>
    <PageHeader>Add Product</PageHeader>
    <ProductForm product={product} />
    </>
  )
}