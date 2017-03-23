import {toHash, fromHash, translationHelpTemplate} from '../utils/src/AnnaHelper'

jest.unmock('../utils/src/AnnaHelper')

describe('AnnaHelper', () => {
  it('it should be able to hash string', () => {
    expect(toHash('%1$d har utnyttjas %2$d och har <boldGreen>%3$s</boldGreen> kvar för att få belöningen på %4$s.')).toMatchSnapshot()
  })

  it('it should be able to call fromHash', () => {
    expect(fromHash('89438949034034 har utnyttjas 89438949034035 och har <boldGreen>89438949034032</boldGreen> kvar för att få belöningen på 89438949034033.')).toMatchSnapshot()
  })

  it('it should not have changed translation helper template ', () => {
    expect(translationHelpTemplate).toEqual('*** PLZ_TRANSLATE from en.json ***')
  })

  xit('it should translate from en instead of sv', () => {})
})
