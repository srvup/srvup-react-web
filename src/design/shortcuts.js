import React from 'react'

import {withUser} from '../auth'
import {PageDetail} from '../components/pages'

const About = (props) => (
  <PageDetail slug='about' />
)

const Contact = (props) => (
  <PageDetail slug='contact' />
)


const AboutPage = withUser(About)
const ContactPage = withUser(Contact)


export {AboutPage, ContactPage}
