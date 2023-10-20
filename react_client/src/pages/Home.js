import { Grid } from "@mui/material";
import '../style/Home.css';

const Home = () => {

  return <>
    <Grid container justifyContent='center'  className="home-container" sx={{p:2}}>
      <Grid item sm={10} zIndex={`${1}`} sx={{ color: 'white' }}> 
        <h1>Home Page</h1>
        <hr />
        <p>Home Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum officiis debitis vel tenetur quos animi vero voluptates reiciendis, omnis sed in libero temporibus deleniti pariatur expedita corporis officia. Odit enim, quasi facere magnam earum officiis ipsa aliquid impedit velit quibusdam dolor ex esse ratione explicabo quod, culpa temporibus? Dolorem deleniti doloremque maxime quas deserunt. Ex aspernatur saepe illo eaque corrupti placeat, aperiam nulla adipisci itaque quos necessitatibus iure at minus non delectus ratione quod ad. Alias dolore perferendis est expedita iure! Nostrum laborum tempore amet commodi voluptas accusamus enim repudiandae, quia odio cumque, laboriosam architecto illo! Aliquid, fuga quis.</p>
      </Grid>
    </Grid>
  </>;
};

export default Home;




