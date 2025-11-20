import React, { useState } from 'react'
import { Palette, Check } from 'lucide-react'

export default function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Black', value: '#1F2937' },
    { name: 'Royal Gold', value: '#FFD700' },
    { name: 'Emerald', value: '#50C878' },
    { name: 'Deep Navy', value: '#212A3E' },
    { name: 'Aqua', value: '#00FFFF' },
    { name: 'Coral', value: '#FF7F50' },
    { name: 'Slate', value: '#708090' },
    { name: 'Rose', value: '#FF007F' },
    { name: 'Turquoise', value: '#1DE9B6' },
    { name: 'Charcoal', value: '#323232' },
    { name: 'Silver', value: '#C0C0C0' },
    { name: 'Royal Purple', value: '#7851A9' },
    { name: 'Goldenrod', value: '#DAA520' },
    { name: 'Sky Blue', value: '#00BFFF' },
    { name: 'Mint Green', value: '#98FF98' },
    { name: 'Pearl', value: '#FDEFDF' },
    { name: 'Ivory', value: '#FFFFF0' }
  ]

  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (value) => {
    if (onChange) onChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleSelect(color.value)}
              className="cursor-pointer group flex flex-col items-center focus:outline-none"
              aria-label={`Select ${color.name}`}
            >
              <div
                className="relative w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <p className="text-xs text-center mt-1 text-gray-600">{color.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}