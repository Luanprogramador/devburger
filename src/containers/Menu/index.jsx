import { useEffect, useState } from "react";
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, VoltarButton, } from "./styles";
import { api } from "../../services/api";
import { FormatPrice } from "../../utils/FormatPrice";
import { CardProduct } from "../../components/CardProduct";
import { useLocation, useNavigate } from "react-router-dom";

export function  Menu(){
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    

const navigate = useNavigate();
const {search} = useLocation();

const queryParams = new URLSearchParams(search);


const [activeCategory, setActiveCategory] = useState(()=>{
  const categoryId = +queryParams.get('categoria');

  if(categoryId){
    return categoryId
  }
  return 0;
});



 useEffect(() => {
        async function loadCategories() {
          const { data } = await api.get('/categories');

const newCategories = [{id: 0, name:'todas'},...data];

          setCategories(newCategories);
          
        }
async function loadProducts() {
      const { data } = await api.get('/products');


      const newProducts = data
      .map(product =>({
        currencyValue:FormatPrice(product.price),
        ...product,

        }));
      setProducts(newProducts)
      
    }
    loadCategories();
    loadProducts();


        
      }, []);

useEffect(() =>{
if(activeCategory === 0){
  setFilteredProducts(products);
} else {
  const newFiteredProducts = products.filter(
    (product) => product.category_id === activeCategory,
  );
  setFilteredProducts(newFiteredProducts)
}
},[products, activeCategory])

    return(
        <Container>
            <Banner>
            <h1> O MELHOR 
                <br/>
                HAMBURGER
                <br/>
                ESTA AQUI!

                <span>esse cardapio esta irresistivel!</span>
            </h1>
            
            </Banner>
            
            <CategoryMenu>
              {categories.map(category => (
                <CategoryButton key={category.id}
                $isActveCtegory={category.id === activeCategory}

                onClick={() => {
                  navigate(
                    {
                      pathname:'/cardapio',
                      search:`?categoria=${category.id}`,
                    },

                    {
                      replace:true,
                    },

                    
                    
                  );
                  setActiveCategory(category.id);
                }}
                >{category.name}</CategoryButton>
              ))}  
              
            </CategoryMenu>

            <ProductsContainer>
{filteredProducts.map(product =>(
    <CardProduct product={product}key={product.id}/>
))};




                 </ProductsContainer>
                 <VoltarButton><a href="http://localhost:5173/" target="_bland">voltar</a> </VoltarButton>
                 
              
                
               

            </Container>
        
    );
}