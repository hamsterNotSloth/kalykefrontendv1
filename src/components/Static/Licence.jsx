import React from 'react'

function Licence() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Complete License Policy</h1>

            <p>Welcome to Kalyke, a platform where you can discover and download unique 3D designs. This document outlines the terms and conditions governing your access and use of these designs. By accessing and using Kalyke, you agree to abide by these terms.</p>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">1. Copyright and Ownership:</h2>
                <p>Designers retain all copyrights and intellectual property rights to their designs, even after they are uploaded to Kalyke. Each design has its own specific license, chosen by the designer, that governs how the files can be used, shared, and modified.</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">2. License Categories:</h2>
                <h3 className="text-xl font-bold mb-2">2.1 Free Licenses:</h3>
                <p>These licenses allow for non-commercial use and distribution of the files, but with certain restrictions. Examples include:</p>
                <ul className="list-disc pl-8 mt-2">
                    <li>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0): You can share and adapt the design, but you must give credit to the designer and share any derivative works under the same license.</li>
                    <li>Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0): You can share the design but cannot modify or adapt it.</li>
                    <li>CERN Open Hardware Licence 1.2: You can share and modify the design, but you must distribute it under the same license and give credit to the original designer.</li>
                    <li>GNU General Public License 3.0 (GPLv3): You can share and modify the design, but you must distribute any derivative works under the same license.</li>
                    <li>GNU Lesser General Public License 3.0 (LGPLv3): You can share and modify the design, but you are not required to distribute any derivative works under the same license.</li>
                </ul>

                <h3 className="text-xl font-bold mt-4 mb-2">2.2 Commercial Licenses:</h3>
                <p>These licenses allow users to sell 3D prints and adapted models derived from the original design. Examples include:</p>
                <ul className="list-disc pl-8 mt-2">
                    <li>Kalyke Commercial Use (CU): You can sell 3D prints and adapted models in unlimited quantities, but you cannot share the digital files of the original or adapted designs.</li>
                    <li>Kalyke Commercial Use - No Derivative (CU-ND): You can sell 3D prints of the original design in unlimited quantities, but you cannot modify or share the digital files.</li>
                </ul>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">3. License Responsibilities:</h2>
                <h3 className="text-xl font-bold mb-2">3.1 Designers:</h3>
                <p>You are responsible for choosing an appropriate license for your design and ensuring that it accurately reflects your intended use. You are responsible for ensuring that you have the copyright and necessary permissions to share any designs that incorporate third-party content.</p>

                <h3 className="text-xl font-bold mt-4 mb-2">3.2 Users:</h3>
                <p>You are responsible for reading and understanding the specific license terms before downloading any design. You agree to use the designs only in accordance with the chosen license. You are responsible for obtaining any necessary permissions before using the designs for commercial purposes.</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">4. Default License:</h2>
                <p>If a designer does not specify a license for their design, the "Kalyke - Private Use" license will apply by default. This license allows for private use of the 3D prints but prohibits commercial use, modification, and sharing of the digital files.</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">5. Specific Licenses:</h2>
                <p>For detailed information on each license, including allowed and restricted uses, please refer to the individual license descriptions provided by Kalyke.</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">6. Compliance:</h2>
                <p>Kalyke takes intellectual property rights seriously. Users who violate the terms of a license may face legal consequences and be banned from using the platform. We may also remove any infringing content from the platform.</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">7. Changes to the License Policy:</h2>
                <p>Kalyke reserves the right to update this License Policy at any time. We will notify users of any changes through our website or other appropriate channels.</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">8. Contact Us:</h2>
                <p>If you have any questions about the Kalyke License Policy, please contact us at [insert contact information].</p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Additional Information:</h2>
                <p>This is a general overview of the Kalyke License Policy. It is not a substitute for legal advice. We recommend that you consult with an attorney if you have any questions or concerns about using designs on Kalyke.</p>
                <p>Kalyke may offer additional terms and conditions for specific services or features. These terms will be displayed prominently when you access those services or features.</p>
                <p>By using Kalyke, you agree to be bound by all applicable laws and regulations.</p>
                <p>Thank you for choosing Kalyke!</p>
            </section>
        </div>
    )
}

export default Licence
