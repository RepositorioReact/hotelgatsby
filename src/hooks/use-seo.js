import {graphql, useStaticQuery} from 'gatsby';

const useSeo = () => {

    const data = useStaticQuery(graphql`
        query{
            datoCmsSite{
                globalSeo{
                    siteName
                    titleSuffix
                    fallbackSeo{
                        title
                        description
                    }
                }
            }
         }
    `)
    
    //Como no tenemos importado React el return va sin parentesis
    return data.datoCmsSite.globalSeo;
}
 
export default useSeo;