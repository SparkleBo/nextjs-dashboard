
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page({
    params,
}: {
    params: {
        id: string;
    }
}) {

    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    if (!invoice) {
        return notFound();
    }

    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Update Invoice',
            href: '/dashboard/invoices/edit',
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers}/>
    </main>
    );
}