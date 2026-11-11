let container = document.querySelector(".box");
let city = "london"
const url = `https://api.api-ninjas.com/v1/worldtime?timezone=UK/NewYork`;

const getdata = async (url) => {
    try {
        const data = await fetch(url, {
            headers: {
                "X-Api-Key": " Eg3mVps6ztnD7b3lF8XWP8USscKNDZVkOLGHlHKx"
            }
        });

        const res = await data.json();
        const { datetime, day_of_week } = res;
        let p = document.createElement('p');
        container.append(p);
        p.textContent = datetime;
        // document.body.append(p)
        // p.textContent = day_of_week;

        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

getdata(url);