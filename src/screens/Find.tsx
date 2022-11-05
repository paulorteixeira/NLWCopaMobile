import { Code, Heading, VStack,  } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

import { useToast } from "native-base";

import { api } from "../services/api";

import { useNavigation } from "@react-navigation/native";

export function Find(){
    
    const [isLoading,setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const toats = useToast();
    const {navigate} =useNavigation();

    async function handleJoinPool() {
        try {
            setIsLoading(true);
            if(!code.trim){
                return toats.show({
                    title:'Informe o código!',
                    placement:'top',
                    bgColor:'red.500'
                })
            }
            await api.post('/pools/join',{code});


            toats.show({
                title:'você entrou no bolão com sucesso!',
                placement:'top',
                bgColor:'green.500'
            })

            navigate('pools');

        } catch (error) {
            console.log(error)
            setIsLoading(false);
            if(error.response?.data?.message ==='Pool not found'){
                return toats.show({
                    title:'Bolão não encontrado!',
                    placement:'top',
                    bgColor:'red.500'
                })
            }
            if(error.response?.data?.message ==='You already joined this pool.'){
                return toats.show({
                    title:'Você já está neste bolão!',
                    placement:'top',
                    bgColor:'red.500'
                })
            }
            toats.show({
                title:'Não foi possivel encontrar o bolão',
                placement:'top',
                bgColor:'red.500'
            })
        }
    }
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
              
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontrar um bolão através de seu código único
                </Heading>
                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    onChangeText={setCode}
                    autoCapitalize='characters'
                />

                <Button title="BUSCAR BOLÃO" isLoading={isLoading} onPress={handleJoinPool}/>


            </VStack>
        </VStack>
    );
}