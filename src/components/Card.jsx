const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

function Card({item, handler}) {
  return (
    <>
        <div onClick={() => handler(item.id)}>
        <p>{capitalize(item.name)}</p>
        <img src={item.sprites.front_default}></img>
        </div>
    </>
  )
}

export default Card
