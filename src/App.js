import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [products, setProducts] = useState("chicken and spaghetti");
  async function getData(){
    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      params: {query: products.toLowerCase()},
      headers: {
        'X-RapidAPI-Key': 'c1cac70d91mshe6906fa1956ed58p1d6076jsn22f7057883e3',
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
      }
    };
    
    await axios.request(options).then(function (response) {
      setData(response.data.items)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });
  }

  function handleClick(e){
    e.preventDefault()
    getData()
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div className="p-6 flex flex-col items-center h-full">
      <div className="border border-black bg-yellow-400 p-20 rounded">
        <h1 className="lg:text-7xl md:text-3xl md:text-left text-2xl font-bold text-center">Nutrition Facts API</h1>
        <p className="lg:text-xl md:text-left text-sm text-center mt-2 font-[300]">This CalorieNinjas API has the nutrition data of thousands of foods and drinks.</p>
        <p className="lg:text-xl md:text-left text-sm text-center mt-2 font-[300]">Enter any food/drink (ex: chicken, beef, orange juice) below and find its nutrition facts!</p>
      </div>
      <section className="md:w-[60%] mt-5">
        <div className="flex">
          <input 
            className="capitalize border border-black w-full font-bold text-md outline-none p-2" 
            type="text"
            placeholder="Chicken and Spaghetti"
            onChange={(e) => {
              setProducts(e.target.value);
            }}
          />
          <button 
            className="border border-black bg-yellow-400 py-2 px-2 hover:bg-cyan-800 duration-200"
            onClick={(e) => handleClick(e)}>
              Search
          </button>
        </div>
        <p className="self-start text-black/50">*Note: Separate foods/drinks with 'and' to have multiple results!</p>
      </section>
     
      <div className="md:flex-row flex flex-col gap-5 flex-wrap justify-center items-center h-full p-6 w-full">
        {!loading &&
          data.map((item) => {
            return(
              <div key={item.name} className="md:w-[30%] border border-2 border-black p-2 h-fit w-full">
                <h1 className="lg:text-5xl text-4xl font-bold capitalize">{item.name}</h1>
                <div className="w-full h-[2px] bg-black mt-1"></div>
                <section className="flex items-center justify-between">
                  <h2 className="font-bold text-2xl">Serving size</h2>
                  <p className="font-bold text-2xl">{item.serving_size_g}g</p>
                </section>
                <div className="w-full h-[15px] bg-black mt-1"></div>
                <div>

                  <h2 className="font-bold text-lg">Amount per serving</h2>
                  <section className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Calories</h2>
                    <h2 className="text-2xl font-bold">{item.calories}</h2>
                  </section>

                  <div className="w-full h-[2px] bg-black mt-1"></div>

                  <div className="flex flex-col">
                    <section className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Total Fat</h2>
                      <h2 className="text-lg">{item.fat_total_g}g</h2>
                    </section>

                    <div className="w-full h-[2px] bg-black mt-1"></div>

                    <section className="flex items-center justify-between ml-3">
                      <h2 className="text-lg">Saturated Fat</h2>
                      <h2 className="text-lg">{item.fat_saturated_g}g</h2>
                    </section>
                  </div>

                  <div className="w-full h-[2px] bg-black mt-1"></div>

                  <div className="flex flex-col">
                    <section className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Cholesterol</h2>
                      <h2 className="text-lg">{item.cholesterol_mg}mg</h2>
                    </section>
                  </div>

                  <div className="w-full h-[2px] bg-black mt-1"></div>

                  <div className="flex flex-col">
                    <section className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Sodium</h2>
                      <h2 className="text-lg">{item.sodium_mg}mg</h2>
                    </section>
                  </div>

                  <div className="w-full h-[2px] bg-black mt-1"></div>

                  <div className="flex flex-col">
                    <section className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Total Carbohydrates</h2>
                      <h2 className="text-lg">{item.carbohydrates_total_g}g</h2>
                    </section>

                    <div className="w-full h-[2px] bg-black mt-1"></div>


                    <section className="flex items-center justify-between ml-3">
                      <h2 className="text-lg">Fiber</h2>
                      <h2 className="text-lg">{item.fiber_g}g</h2>
                    </section>

                    <div className="w-full h-[2px] bg-black mt-1"></div>

                    <section className="flex items-center justify-between ml-3">
                      <h2 className="text-lg">Sugar</h2>
                      <h2 className="text-lg">{item.sugar_g}g</h2>
                    </section>
                  </div>

                  <div className="w-full h-[2px] bg-black mt-1"></div>

                  <div className="flex flex-col">
                    <section className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Protein</h2>
                      <h2 className="text-lg">{item.protein_g}g</h2>
                    </section>
                  </div>

                  <div className="w-full h-[15px] bg-black mt-1"></div>

                  <div className="flex justify-between">
                    <h2 className="text-lg">Potassium</h2>
                    <h2 className="text-lg">{item.potassium_mg}mg</h2>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div >
        <h1>© {new Date().getFullYear()} <a className="underline" href="https://www.linkedin.com/in/ricky-la-9aa77715a/">Ricky La</a>: Thanks for visiting :)</h1>
      </div>
    </div>
  );
}

export default App;
