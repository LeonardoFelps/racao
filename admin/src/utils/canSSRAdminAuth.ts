import { AuthTokenError } from "@/services/errors/AuthTokenError";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";

export function canSSRAdminAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@adminauth.token'];

        if(!token){
            return{
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@adminauth.token');

                return{
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

    }

}
