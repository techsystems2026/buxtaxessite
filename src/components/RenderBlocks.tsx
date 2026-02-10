'use client'

import dynamic from 'next/dynamic'

const HeroBlock = dynamic(() => import('@/components/blocks/HeroBlock').then(mod => mod.HeroBlock))
const ServicesOverviewBlock = dynamic(() => import('@/components/blocks/ServicesOverviewBlock').then(mod => mod.ServicesOverviewBlock))
const LatestNewsBlock = dynamic(() => import('@/components/blocks/LatestNewsBlock').then(mod => mod.LatestNewsBlock))
const FAQBlock = dynamic(() => import('@/components/blocks/FAQBlock').then(mod => mod.FAQBlock))
const QuizBlock = dynamic(() => import('@/components/blocks/QuizBlock').then(mod => mod.QuizBlock))
const ClientsBlock = dynamic(() => import('@/components/blocks/ClientsBlock').then(mod => mod.ClientsBlock))
const ContactInfoBlock = dynamic(() => import('@/components/blocks/ContactInfoBlock').then(mod => mod.ContactInfoBlock))
const ContactFormBlock = dynamic(() => import('@/components/blocks/ContactFormBlock').then(mod => mod.ContactFormBlock))
const CTABlock = dynamic(() => import('@/components/blocks/CTABlock').then(mod => mod.CTABlock))
const StatsGridBlock = dynamic(() => import('@/components/blocks/StatsGridBlock').then(mod => mod.StatsGridBlock))
const RichContentBlock = dynamic(() => import('@/components/blocks/RichContentBlock').then(mod => mod.RichContentBlock))
const ToolsPreviewBlock = dynamic(() => import('@/components/blocks/ToolsPreviewBlock').then(mod => mod.ToolsPreviewBlock))
const TariffsBlock = dynamic(() => import('@/components/blocks/TariffsBlock').then(mod => mod.TariffsBlock))
const ValuesBlock = dynamic(() => import('@/components/blocks/ValuesBlock').then(mod => mod.ValuesBlock))

interface RenderBlocksProps {
    blocks: Array<{
        blockType: string
        [key: string]: unknown
    }>
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
    if (!blocks || blocks.length === 0) {
        return null
    }

    return (
        <>
            {blocks.map((block, index) => {
                switch (block.blockType) {
                    case 'heroBlock':
                        return <HeroBlock key={index} {...block as any} />
                    case 'servicesOverviewBlock':
                        return <ServicesOverviewBlock key={index} {...block as any} />
                    case 'latestNewsBlock':
                        return <LatestNewsBlock key={index} {...block as any} />
                    case 'faqBlock':
                        return <FAQBlock key={index} {...block as any} />
                    case 'quizBlock':
                        return <QuizBlock key={index} {...block as any} />
                    case 'clientsBlock':
                        return <ClientsBlock key={index} {...block as any} />
                    case 'contactInfoBlock':
                        return <ContactInfoBlock key={index} {...block as any} />
                    case 'contactFormBlock':
                        return <ContactFormBlock key={index} {...block as any} />
                    case 'ctaBlock':
                        return <CTABlock key={index} {...block as any} />
                    case 'statsGridBlock':
                        return <StatsGridBlock key={index} {...block as any} />
                    case 'richContentBlock':
                        return <RichContentBlock key={index} {...block as any} />
                    case 'toolsPreviewBlock':
                        return <ToolsPreviewBlock key={index} {...block as any} />
                    case 'tariffsBlock':
                        return <TariffsBlock key={index} {...block as any} />
                    case 'valuesBlock':
                        return <ValuesBlock key={index} {...block as any} />
                    default:
                        console.warn(`Unknown block type: ${block.blockType}`)
                        return null
                }
            })}
        </>
    )
}
