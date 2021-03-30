import React, { useEffect, useState } from "react"
import Link from "next/link"

import api from "@api/index"

import Container from "@components/Layout/Container"
import SectionHeader from "@components/Display/SectionHeader"
import BrandCard from "@components/Cards/Brand"
import Button from "@components/Forms/Button"

import "./PreviewBrands.scss"

const PreviewBrands = ({ brands }) => {
  return (
    <section className="preview-brands">
      <Container>
        <div className="preview-brands__header">
          <SectionHeader
            title="Бренды"
            description="Более 30 ведущих компаний"
          />
        </div>

        <div className="preview-brands__list">
          {brands.map((brand, key) => (
            <Link key={key} href={`/vendors/${brand.code}`}>
              <div className="preview-brands__list-item">
                <BrandCard image={brand.image}/>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/vendors">
          <div className="preview-brands__nav">
            <Button
              label="Все бренды"
              size="xs"
              outline
            />
          </div>
        </Link>
      </Container>
    </section>
  )
}

export default PreviewBrands
