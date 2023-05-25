import { canSSRAuth } from "@/utils/canSSRAuth"


export default function Payment(){
    return(
        <div>
            <h1>Área de pagamento</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
        props:{}
    }
})