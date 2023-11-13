import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Input, Select, SelectItem, input } from "@nextui-org/react";

export default function registerProduct () {
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [mandatoryInputs, setMandatoryInputs] = useState([])

    const enpoint = import.meta.env.VITE_BACKEND_END_POINT

    useEffect(() => {
        const timer = setTimeout(() => {
            getRecomendedCategories()
        }, 500)
        return () => clearTimeout(timer)
    }, [title])

    useEffect(() => {
        getMandatoryAttributes()
    }, [selectedCategory])

    useEffect(() => {
        renderMandatoryInputs()
    }, [mandatoryInputs])

    const getRecomendedCategories = async () => {
        setCategories([])
        setMandatoryInputs([])
        const response = await axios.get(`${enpoint}mercado-libre/predict-category?limit=3&q=${title}`)
        console.log(response)
        if (response.status === 200) {
            setCategories(response.data)
        }
    }

    const getMandatoryAttributes = async () => {
        try {
            const response = await axios.get(`https://api.mercadolibre.com/categories/${selectedCategory}/technical_specs/input`)
            const mandatory = response.data.groups[0].components.filter(element => element.attributes[0].tags.includes('required'))
            setMandatoryInputs(mandatory)
        } catch(error) {
            console.log(error)
        }
    }

    const renderMandatoryInputs = () => {
        const combo = mandatoryInputs.filter(input => input.component === 'COMBO')
        const text = mandatoryInputs.filter(input => input.component === 'TEXT_INPUT')
        console.log(mandatoryInputs)
        return (
            <>
            { text &&
                text.map(input => (
                    <Input
                        key={input.label}
                        isRequired
                        type='text'
                        label={input.label}
                        labelPlacement='outside'
                        placeholder={input.ui_config.hint ?? input.label}
                        radius='none'
                    />
                ))
            }
            { combo && 
                combo.map(input => (
                    <Select
                        isRequired
                        label={input.label}
                        labelPlacement='outside'
                        placeholder={input.ui_config.hint ?? input.label}
                        radius='none'
                        key={input.label}>
                        {
                            input.attributes[0].values.map(value => (
                                <SelectItem key={value.id} value={value.id}>
                                    {value.name}
                                </SelectItem>
                            ))
                        }
                    </Select>
                ))
            }
            </>    
        )
    }

    return (
        <section className='py-20'>
            <form>
                <Input
                    isRequired
                    type="text"
                    label="Titulo"
                    placeholder="incluye producto, marca, modelo y destaca sus características principales"
                    labelPlacement="outside"
                    radius='none'
                    onChange={(e) => setTitle(e.target.value)}
                />
                { categories.length > 0 && 
                    <Select
                        isRequired
                        label="Categoria"
                        labelPlacement='outside'
                        placeholder='Selecciona la categoria'
                        radius='none'
                        >
                            {categories.map(category => (
                                <SelectItem key={category.category_id} value={category.category_id} onClick={() => setSelectedCategory(category.category_id) }>
                                    {category.category_name}
                                </SelectItem>))}
                    </Select> 
                }
                { mandatoryInputs.length > 0 && renderMandatoryInputs()}
                <Input
                    type="text"
                    label="Descripción"
                    placeholder="Escribe una descripción del producto"
                    labelPlacement="outside"
                    radius='none'
                />
                <Input
                    type="text"
                    label="SKU"
                    placeholder="Ingresa el SKU del producto"
                    labelPlacement="outside"
                    radius='none'
                />
                <Input
                    isRequired
                    type="number"
                    label="Precio"
                    placeholder="Ingresa el precio del producto"
                    labelPlacement="outside"
                    radius='none'
                />
            </form>
        </section>
    )
}
