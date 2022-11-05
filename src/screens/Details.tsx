import { VStack, useToast, HStack } from "native-base";
import { Header } from "../components/Header";
import { Option } from "../components/Option";
import {useRoute} from '@react-navigation/native'
import { useEffect, useState } from "react";
import { Share} from   'react-native';
import { Loading } from "../components/Loading";
import { PoolPros } from "../components/PoolCard"; 
import { api } from '../services/api';
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import {Guesses} from "../components/Guesses"


interface RouteParams{
    id: string;
}
export function Details(){
    const route = useRoute();
    const {id} = route.params as RouteParams;
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros);
    const [optionSelected,setOptionSelected] = useState<'Seus Palpites' | 'Ranking do grupo'>('Seus Palpites');
   
   
    async function fetchPoolDetails(){
        try {
            setIsLoading(true)
            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool);


        } catch (error) {
            console.log(error)
            toast.show({
                title:'Não foi possivel carregar os detalhes do bolão',
                placement:'top',
                bgColor: 'red.500'
            });
        }finally{
            setIsLoading(false)
        }

    }

    async function handleCodeShare(){
        await Share.share({
            message:poolDetails.code
        });
    }

    useEffect(()=>{
        fetchPoolDetails();
    },[id])
    if(isLoading){
        return <Loading/>
    }
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} 
            showBackButton 
            showShareButton
            onShare={handleCodeShare}
            />
            {
                poolDetails._count?.participants>0?
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option 
                            title="Seus palpites" 
                            isSelected={optionSelected ==='Seus Palpites'}
                            onPress={()=> setOptionSelected('Seus Palpites')}
                        />
                        <Option 
                            title="Ranking do grupo" 
                            isSelected={optionSelected === 'Ranking do grupo'}
                            onPress={()=> setOptionSelected('Ranking do grupo')}
                        />
                    </HStack>
                    
                    <Guesses poolId={poolDetails.id} code={poolDetails.code}/>

                </VStack>

                :  <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>

    );
}