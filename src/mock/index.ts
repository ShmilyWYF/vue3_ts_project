import MockHandler from '@/mock/MockHandler'

const glob:Record<string, Object> = import.meta.glob('../mock/*Api/*.ts',{eager:true});

export default function () {
  MockHandler.mockOption(glob)
}
