import 'module-alias/register'
import { addAliases } from 'module-alias'

addAliases({
    '@': `${__dirname}`,
    '@services': `${__dirname}/services`,
    '@utils': `${__dirname}/utils`,
})
