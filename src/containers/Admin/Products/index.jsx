import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FormatPrice} from '../../../utils/FormatPrice';


import{api} from '../../../services/api';
//import { data } from "react-router-dom";
import { Container, ProductImage,  } from "./styles";
import { CheckCircle, Pencil, XCircle } from "@phosphor-icons/react";
import { EditButton } from "./styles";
import { useNavigate } from "react-router-dom";

export function Products(){
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    
      useEffect(() => {
        async function loadProducts() {
            const {data} = await api.get('/products');  
            
            console.log(data);

          setProducts(data)
          
        }
        loadProducts();
      }, []);

      function isOffer(offer1){
        if(offer1){
            return<CheckCircle color="#61A120" size="28"/>;
        }else{
            return <XCircle color="#FF3205" size="28"/>;
        }
      }

    function editProdut(product){
        navigate('/admin/editar-produto',{state:{product}});
    }
    return(
        <Container>
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="center">Preç</TableCell>
            <TableCell align="center">Produto em Oferta</TableCell>
            <TableCell align="center">Imagem do Produto</TableCell>
            <TableCell align="center">Editar Produto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="center">{FormatPrice( product.price)}</TableCell>
              <TableCell align="center">{isOffer(product.oferr1)}</TableCell>
              <TableCell align="center">
                <ProductImage src={product.url}/>
              </TableCell>
              <TableCell align="right">
                <EditButton onClick={()=>editProdut(product)}>
                    <Pencil/>
                </EditButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
    );
    }