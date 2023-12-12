import React from 'react'

function Licence() {
    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">License Policy for Kalyke</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">General Principles:</h2>
                <ul className="list-disc pl-6">
                    <li>All designs available on Kalyke are subject to licenses and are not all free of copyrights.</li>
                    <li>Designers are the copyright holders of their files and retain the right to control how those files are shared, credited, and used.</li>
                    <li>Each design has its own specific license.</li>
                    <li>By downloading a design from Kalyke, you agree to respect the terms of the chosen license and to use, share, and attribute the design accordingly.</li>
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">License Categories:</h2>
                <p>There are two main categories of licenses available on Kalyke:</p>
                <ul className="list-disc pl-6">
                    <li>Free Digital File Licenses: These licenses allow non-commercial use of the designs with certain restrictions.</li>
                    <li>Sellable Digital File Licenses: These licenses allow commercial use of the designs with certain restrictions.</li>
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Licenses for Free Digital Files:</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Private Use:</h3>
                    <p>This is the default license for all designs on Kalyke. It allows for private use of the design, such as printing and sharing images of your 3D prints. However, it does not allow for commercial use, public sharing, modification, or distribution of the digital files.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Creative Commons Licenses:</h3>
                    <ul className="list-disc pl-6">
                        <li>CC BY-NC-ATTRIBUTION - NON COMMERCIAL: Allows sharing and adaptation with attribution and non-commercial use.</li>
                        <li>CC BY-NC-SA - ATTRIBUTION - NON COMMERCIAL - SHARE ALIKE: Allows sharing and adaptation with attribution, non-commercial use, and sharing under the same license.</li>
                        <li>CC BY-NC-ND - ATTRIBUTION - NON COMMERCIAL - NO DERIVATIVES: Allows sharing with attribution and non-commercial use, but no adaptation.</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">CERN Open Hardware Licence (OHL):</h3>
                    <p>This license allows for sharing, adaptation, and commercial use with certain restrictions, such as maintaining attribution and sharing the same license.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">GNU General Public License (GPL):</h3>
                    <p>This license allows for sharing, adaptation, and commercial use with certain restrictions, such as sharing the source code and respecting the conditions of the license.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">GNU Lesser General Public License (LGPL):</h3>
                    <p>This license allows for sharing, adaptation, and commercial use with certain restrictions, such as maintaining attribution and respecting the conditions of the license.</p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Licenses for Sellable Digital Files:</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">CU - Commercial Use:</h3>
                    <p>This license allows for commercial use of the design, including selling 3D prints and adapted models in unlimited quantities. It also allows for adaptation of the design. However, it does not allow sharing of the digital files.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">CU-ND - Commercial Use - No Derivative:</h3>
                    <p>This license allows for commercial use of the design, including selling 3D prints in unlimited quantities. However, it does not allow modification or adaptation of the design, nor does it allow distribution or resale of the digital files.</p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Responsibilities:</h2>
                <ul className="list-disc pl-6">
                    <li>Designers: Designers are responsible for choosing the appropriate license for their designs and ensuring that their files are accurately licensed.</li>
                    <li>Members: Members are responsible for reading and understanding the terms of the license before downloading any design. They are also responsible for using, sharing, and attributing the design in accordance with the chosen license.</li>
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Additional Information:</h2>
                <p>You can find more information about the specific terms of each license by clicking on the license name.</p>
                <p>If you have any questions about licenses or how to use a design, please contact the designer directly.</p>
            </div>

            <p className="text-sm text-gray-500">Disclaimer: This document is for informational purposes only and does not constitute legal advice. Please consult with an attorney if you have any questions about the legal terms of a license or your rights and obligations under the law.</p>
        </div>
    )
}

export default Licence
