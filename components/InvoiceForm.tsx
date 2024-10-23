"use client";


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft } from 'lucide-react';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    product: '',
    quantity: '',
    unitOfMeasure: '',
    unitPrice: '',
  });
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
        } else {
          setUserProfile(profile);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userProfile) {
      console.error('User profile information is missing');
      return;
    }

    const totalPrice = parseFloat(formData.quantity) * parseFloat(formData.unitPrice);

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        customer_name: formData.customerName,
        type_of_sale: 'invoice',
        product: formData.product,
        quantity: parseFloat(formData.quantity),
        unit_of_measure: formData.unitOfMeasure,
        unit_price: parseFloat(formData.unitPrice),
        total_price: totalPrice,
        user_name: userProfile.name,
        company_name: userProfile.company_name,
      });

    if (error) {
      console.error('Error saving invoice:', error);
    } else {
      console.log('Invoice saved successfully:', data);
      // Reset form or navigate to a success page
      setFormData({
        customerName: '',
        product: '',
        quantity: '',
        unitOfMeasure: '',
        unitPrice: '',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 animate-slide-in">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">New Invoice</h1>
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </header>
      <main className="flex-grow p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div>
            <Label htmlFor="customerName" className="text-gray-700">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="product" className="text-gray-700">Product</Label>
            <Input
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity" className="text-gray-700">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="unitOfMeasure" className="text-gray-700">Unit of Measure</Label>
              <Input
                id="unitOfMeasure"
                name="unitOfMeasure"
                value={formData.unitOfMeasure}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="unitPrice" className="text-gray-700">Unit Price</Label>
              <Input
                id="unitPrice"
                name="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>
        </form>
      </main>
      <footer className="bg-white shadow-md p-4">
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
          Save Invoice
        </Button>
      </footer>
    </div>
  );
};

export default InvoiceForm;