#ReadMe
##Explanation
###Properties of Air
*Ideal Gas Law Pressure * Volume = amount * constant * Temperature
*With a flight simulator air means atmosphere, weather, and wind.  (Weather is currently beyond the scope of this program.)
*Air is a fluid.  The 2 basic properties of a fluid are density and pressure.
*Pressure doesn't affect flight.
*Velocity or wind speed.
*Relative velocity takes into account both the velocity of wind and the airplane.  This is what is used for lift and drag calculations.
*Density or rho is a major factor in flight.  It is a multiplier in lift and drag calcuations.  It decreases with altitude, and it creates the maximum altitude for airplanes.
####Calculating Air Denisty
Air Denisty varies as much as the weather (and because of it).  Because of this any air denisty equation for our simulation must be derived.  The U.S. Standard Atmosphere provides data at various altitudes about the atmosphere.  After extracting the altitude and denisty data; a regression calcuation results in a effection and usuable equation.  y=18.89-7.06*ln(x)  x is altitude y is density