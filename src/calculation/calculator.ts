import { materials, size } from 'data'

export const calculator = (
  amount: number,
  selectSize: string,
  selectMaterial: string
) => {
  const filterSelectedMaterial = materials.filter(
    (item) => item.value === selectMaterial
  )
  const filterSelectedSize = size.filter(
    (item: { value: string }) => item.value === selectSize
  )

  return ((filterSelectedMaterial[0].price + filterSelectedSize[0].price) * amount)
  // switch (size) {
  //   case 1:
  //     console.log('Poniedziałek');
  //     break;
  //   case 2:
  //     console.log('Wtorek');
  //     break;
  //   case 3:
  //     console.log('Środa');
  //     break;
  //   case 4:
  //     console.log('Czwartek');
  //     break;
  //   case 5:
  //     console.log('Piątek');
  //     break;
  //   case 6:
  //     console.log('Sobota');
  //     break;
  //   case 7:
  //     console.log('Niedziela');
  //     break;
  //   default:
  //     console.log('Niepoprawna wartość');
  // }
  // console.log(value)
}
