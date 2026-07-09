import { Grid } from "@mui/material";
import '../style/Home.css';

const Home = () => {

  return <>
    <Grid container justifyContent='center'  className="home-container" sx={{p:2}}>
      <Grid item sm={10} zIndex={`${1}`} sx={{ color: 'white' }}> 
        <h1>Home Page</h1>
        <hr />
        {/* <p>Home Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum officiis debitis vel tenetur quos animi vero voluptates reiciendis, omnis sed in libero temporibus deleniti pariatur expedita corporis officia. Odit enim, quasi facere magnam earum officiis ipsa aliquid impedit velit quibusdam dolor ex esse ratione explicabo quod, culpa temporibus? Dolorem deleniti doloremque maxime quas deserunt. Ex aspernatur saepe illo eaque corrupti placeat, aperiam nulla adipisci itaque quos necessitatibus iure at minus non delectus ratione quod ad. Alias dolore perferendis est expedita iure! Nostrum laborum tempore amet commodi voluptas accusamus enim repudiandae, quia odio cumque, laboriosam architecto illo! Aliquid, fuga quis.</p> */}
        <p>The Vaccination Booking System is a cutting-edge, comprehensive digital solution that was specifically created to transform the world of vaccination procedures. This system emerges as a crucial tool, capable of effectively organizing vaccine appointments and ensuring equal access to immunization services on a wide scale, in an era where quick, large-scale vaccination campaigns are essential to maintain public health. The method makes it easier to choose practical appointment times at neighboring immunization clinics. It uses advanced algorithms to optimize scheduling in order to decrease wait times and the chance of overcrowding. The Vaccination Center Booking System serves as a crucial component in the battle against infectious diseases, particularly in the face of global health crises. It is an innovative digital platform designed to simplify and expedite the vaccination appointment booking process, ultimately contributing to higher vaccination rates and enhanced public health outcomes.</p>
      </Grid>
    </Grid>
  </>;
};

export default Home;




