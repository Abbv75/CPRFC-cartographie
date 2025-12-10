import { Fragment } from 'react'
import RegionShapFiles from './RegionShapFiles'
import ProvinceShapFiles from './ProvinceShapFiles'
import CommuneShapFiles from './CommuneShapFiles'
import VillagePoints from './VillagePoints'
import ArrondissementShapFiles from './ArrondissementShapFiles'

const LocaliteElement = () => {
    return (
        <Fragment>
            <RegionShapFiles />
            <ProvinceShapFiles />
            <ArrondissementShapFiles />
            <CommuneShapFiles />
            <VillagePoints />
        </Fragment>
    )
}

export default LocaliteElement