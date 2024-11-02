export const imageUpload = async () => {
    if (req.file) {
        const imageUrl = `/public/uploads/products/${image.filename}`;
        const productImage = await Product.updateOne({_id: create_product.id}, {$set:{product_image: imageUrl}})
    }
}