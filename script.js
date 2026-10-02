document.getElementById("findExercises").addEventListener("click", function () {

    
    const primaryMuscle = document.querySelector(
        'select[name="primaryMuscle"]'
    ).value;

    console.log(primaryMuscle)

    const secondaryMuscle = document.querySelector(
        'select[name="secondaryMuscle"]'
    ).value;

    const maxComplexity = document.querySelector(
        'input[name="maxComplexity"]'
    ).value;

    const equipment = Array.from(
        document.querySelectorAll('input[name="Equipment"]:checked')
    ).map(checkbox => checkbox.value);





    if ( secondaryMuscle != "") 
    {
        const params = new URLSearchParams();
        params.append("maxComplexity", maxComplexity);
        params.append("safetyRequired", "true");
        params.append("primaryMuscle", primaryMuscle);
        params.append("secondaryMuscle", secondaryMuscle);
        equipment.forEach(item => {
        params.append("equipmentList", item);
        });

        fetch(`http://localhost:8080/Api/result/Compound?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayResults(data);
            console.log(`${params.toString()}`)
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
    else {
        const params = new URLSearchParams();
        params.append("maxComplexity", maxComplexity);
        params.append("safetyRequired", "true");
        params.append("primaryMuscle", primaryMuscle);
        equipment.forEach(item => {
        params.append("equipmentList", item);

    });

    fetch(`http://localhost:8080/Api/result/Isolation?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(`${params.toString()}`)
            displayResults(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

        
    }

     

    console.log("Primary:", primaryMuscle);
    console.log("Secondary:", secondaryMuscle);
    console.log("Complexity:", maxComplexity);
    console.log("Equipment:", equipment);


});

function displayResults(exercises) {
    const results = document.getElementById("results");


    results.innerHTML = "";

    if (exercises.length === 0) {
        results.innerHTML = "<p>No exercises found.</p>";
        return;
    }

    exercises.forEach(exercise => {

        
        const card = document.createElement("div");
        if (exercise.secondary_Muscle != null) {
        card.classList.add("exerciseCard");

        card.innerHTML = `
            <h2>${exercise.name}</h2>

            <p>Primary muscle: ${exercise.primary_Muscle}</p>
            <p>Secondary muscle: ${exercise.secondary_Muscle}</p>
            <p>Complexity: ${exercise.complexity}</p>
            <p>Equipment: ${exercise.equipment.join(", ")}</p>
            <p>Safe: ${exercise.solo_Safety ? "Yes" : "No"}</p>
        `;

        results.appendChild(card);
        }
        else {

        card.classList.add("exerciseCard");

        card.innerHTML = `
            <h2>${exercise.name}</h2>

            <p>Primary muscle: ${exercise.primary_Muscle}</p>
            <p>Complexity: ${exercise.complexity}</p>
            <p>Equipment: ${exercise.equipment.join(", ")}</p>
            <p>Safe: ${exercise.solo_Safety ? "Yes" : "No"}</p>
        `;

        results.appendChild(card);
        }

    });
}