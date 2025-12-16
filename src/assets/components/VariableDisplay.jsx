import React from 'react';

function VariableDisplay(props) {
    const var1 = "Test";
    const var2 = 5;
    const var3 = false;
    const var4 = { 
        random: "Variable Display",
        status: "Winner",
        rank: 1,
    };
    const var5 = ["This component displays at random - it is a Variable Display", "Keep refreshing the page and it will disappear", <br />];

    if (Math.random() < .5) {
        return (
            <div>
                <h1><br></br>{var4.random}</h1>
                {var5.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        );
    } else {
        return <p>Keep refreshing the page</p>;
    }
}

export default VariableDisplay;