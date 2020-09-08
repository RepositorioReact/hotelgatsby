exports.createPages = async ({actions, graphql, reporter}) => {

    //Esta consulta nos dice cuantas páginas de habitaciones hay que son las que tiene que crear
    //slug está unido al boton de habitacionPreview.js
    const resultado = await graphql(`
        query{
            allDatoCmsHabitacion{
                nodes{
                    slug
                }
            }
         }
    `);
    //console.log(resultado.data.allDatoCmsHabitacion.nodes);

    if(resultado.errors){
        reporter.panic('No hubo resultados ', resultado.errors);
    }

    //Si hay páginas, crear los archivos
    const habitaciones = resultado.data.allDatoCmsHabitacion.nodes;

    habitaciones.forEach(habitacion => {
        actions.createPage({
            path: habitacion.slug,
            component: require.resolve('./src/components/habitaciones.js'),
            context:{ //el context se inyecta en habitaciones.js
                slug: habitacion.slug //Crea una variable que se puede consumir en la consulta de graphql, que va en el componente de habitaciones.js
            }
        })
    });
}