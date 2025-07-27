import CategoriesList from "@/components/Categories/CategoriesList";
import MainSlider from "@/components/HomeComponents/MainSlider";
import ProductsSection from './../components/Product/ProductsSection';

export default function Home() {

    return (
        <main className='bg-background'>
            <MainSlider />
            <section>
                <h3 className='text-3xl font-bold text-center my-8'>Categories</h3>
                <CategoriesList />
            </section>
            <section>
                <h3 className='text-3xl font-bold text-center my-8'>Featured Products</h3>
                <ProductsSection/>
            </section>
        </main>
    )
}
