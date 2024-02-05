const arr = [
  {
    src: 'https://cdn.britannica.com/25/172925-050-DC7E2298/black-cat-back.jpg'
  },
  {
    src: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
  },
  {
    src: 'https://marvel-b1-cdn.bc0a.com/f00000000209359/test-ug-news.pantheonsite.io/wp-content/uploads/2019/11/cat-2483826_1280.jpg'
  },
  {
    src: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg'
  }
]

export const BackgroundContainer = () => {
  return (
    <div className='flex gap-1 mt-[14px] mb-10'>
      {arr.map((bg, i) => (
        <img key={i} width={28} height={28} src={`${bg.src}`} />
      ))}
    </div>
  )
}
