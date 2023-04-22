import 'module-alias/register'
import { addAliases } from 'module-alias'

addAliases({
    '@services': `${__dirname}/services`,
})
